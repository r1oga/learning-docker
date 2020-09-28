docker build -t r1oga/fib-calc-client-k8s:latest -t r1oga/fib-calc-client-k8s:$SHA ./client/Dockerfile ./client
docker build -t r1oga/fib-calc-api:latest -t r1oga/fib-calc-api:$SHA -f ./api/Dockerfile ./api
docker build -t r1oga/fib-calc-worker:latest -t r1oga/fib-calc-worker:$SHA -f ./worker/Dockerfile ./worker

docker push r1oga/fib-calc-client-k8s:latest
docker push r1oga/fib-calc-client-k8s:$SHA
docker push r1oga/fib-calc-api:latest
docker push r1oga/fib-calc-api:$SHA
docker push r1oga/fib-calc-worker:latest
docker push r1oga/fib-calc-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=r1oga/fib-calc-client-k8s:$SHA
kubectl set image deployments/api-deployment api=r1oga/fib-calc-api:$SHA
kubectl set image deployments/worker-deployment worker=r1oga/fib-calc-worker:$SHA