# Package and Deploy Springboot applications with HELM 
Demonstrates how to deploy Springboot apps with HELM and inject environment specific (DEV/UAT/PROD...) application configuration on a kubernetes configmaps.

## Run this demonstration

* goto [Katacoda HELM course page](https://www.katacoda.com/courses/kubernetes/helm-package-manager)
* git clone https://github.com/agilesolutions/frontend.git
* cd frontend/charts/frontend

## Verify, generate and install with HELM

```
helm lint .
helm template -f values.yaml .
helm install --name frontend --set version=latest .
```

## Debugging and terminal into demo container

1. watch kubectl get all -n frontend
2. watch kubectl get pods -n frontend
3. kubectl logs -f demo-xxx -n frontend
4. kubectl exec -ti demo-xxx -n frontend -- /bin/sh

## setup jenkins

```
helm install --name jenkins --namespace jenkins stable/jenkins

printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo

watch kubectl get svc --namespace jenkins -w jenkins

export SERVICE_IP=$(kubectl get svc --namespace jenkins jenkins --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")

echo http://$SERVICE_IP:8080/login


```


* [helm install jenkins](https://akomljen.com/set-up-a-jenkins-ci-cd-pipeline-with-kubernetes/)
* [read more ](https://cloud.google.com/solutions/jenkins-on-container-engine)

## HELM connecting your cluster

* install kubectl 
* check your $HOME/.kube/config
* find out which cluster Tiller would install to with kubectl config current-context or kubectl cluster-info
* kubectl config get-contexts
* kubectl config use-context CONTEXT_NAME

## Just a test

1. kubectl create deployment test --image=kitematic/hello-world-nginx
2. kubectl get pods
3. kubectl expose deployment test --port=80 --type=NodePort
4. kubectl get services
5. kubectl describe service test
6. http://CLUSTER_IP:NODE_PORT be accessible
