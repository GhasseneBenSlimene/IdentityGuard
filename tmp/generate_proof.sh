#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 YYYY-MM-DD"
    exit 1
fi

DOB=$1
CURRENT_YEAR=$(date +%Y)
DOB_YEAR=$(echo $DOB | cut -d '-' -f 1)
AGE=$((CURRENT_YEAR - DOB_YEAR))

CURRENT_MONTH=$(date +%m)
CURRENT_DAY=$(date +%d)
DOB_MONTH=$(echo $DOB | cut -d '-' -f 2)
DOB_DAY=$(echo $DOB | cut -d '-' -f 3)

if [ "$CURRENT_MONTH" -lt "$DOB_MONTH" ] || { [ "$CURRENT_MONTH" -eq "$DOB_MONTH" ] && [ "$CURRENT_DAY" -lt "$DOB_DAY" ]; }; then
    AGE=$((AGE - 1))
fi

echo "Age calculé: $AGE ans"

ZOKRATES_FILE="age.zok"
PROJECT_DIR="zokrates_proof"

# Vérifier si le répertoire de projet existe déjà
if [ ! -d "$PROJECT_DIR" ]; then
    mkdir "$PROJECT_DIR"
fi

# Se déplacer dans le répertoire de projet
cd "$PROJECT_DIR"

# Vérifier si le fichier .zok existe déjà
if [ ! -f "$ZOKRATES_FILE" ]; then
    cat <<EOF > $ZOKRATES_FILE
def main(private field age) -> field{
    assert(age >= 18);
    return 1;
}
EOF
fi

# Vérifier si le fichier de clés de vérification existe
if [ ! -f "verifier.sol" ]; then
    # Effectuer la configuration uniquement si les clés ne sont pas déjà générées
    docker run -v ${PWD}:/home/zokrates/code -ti zokrates/zokrates /bin/bash -c "
        cd code
        zokrates compile -i $ZOKRATES_FILE
        zokrates setup
        zokrates export-verifier
    "
fi

# Exécuter les commandes ZoKrates pour générer la preuve
docker run -v ${PWD}:/home/zokrates/code -ti zokrates/zokrates /bin/bash -c "
    cd code
    zokrates compute-witness -a $AGE
    zokrates generate-proof
"

echo "La preuve a été générée dans $PWD."
