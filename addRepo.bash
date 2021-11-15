#!/bin/env bash

#echo "Antes de rodar o script certifique-se que:
#- Tem o gitHub-CLI instalado e logado, mais informações em https://github.com/cli/cli/blob/trunk/docs/install_linux.md,
#- Esta rodando o scrip no diretorio raiz /do projeto,
#- Esta na sua branch"

#read stop

git commit -am "add files after format linux"


echo 'Digite o nome do novo repositório (pessoal) que onde vai espelhar o projeto do repositorio da trybe:'

read projectName

#echo 'Digite o nome do seu usuário do GitHub'

#read user

user="rogerio-lambert"

repoName="$projectName"

gh repo create $repoName -y --public

newRepoSSH="git@github.com:""$user""/""$repoName"".git"

git remote add $user $newRepoSSH

git push $user