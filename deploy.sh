sshpass -p $1 ssh -o StrictHostKeyChecking=no root@$2 <<-'ENDSSH'
    cd prencaLata
    docker build .
ENDSSH