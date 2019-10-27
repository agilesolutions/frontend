# Package and Deploy Springboot applications with HELM 
Demonstrates how to deploy Springboot apps with HELM and inject environment specific (DEV/UAT/PROD...) application configuration on a kubernetes configmaps.

## Run this demonstration

* goto [Katacoda HELM course page](https://www.katacoda.com/courses/kubernetes/helm-package-manager)
* [goto play with k8s](https://labs.play-with-k8s.com/)
* git clone https://github.com/agilesolutions/frontend.git
* cd frontend/charts/frontend

## Verify, generate and install with HELM

```
helm lint .
helm template -f values.yaml .
helm install --name frontend --set version=latest .
```

## Debugging and terminal into demo container

```
watch kubectl get all -n frontend
watch kubectl get pods -n frontend
kubectl logs -f demo-xxx -n frontend
kubectl exec -ti demo-xxx -n frontend -- /bin/sh
```

## setup jenkins

```
helm install --name jenkins --namespace jenkins stable/jenkins

printf $(kubectl get secret --namespace jenkins jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo

kubectl get svc --namespace jenkins -w jenkins

export SERVICE_IP=$(kubectl get svc --namespace jenkins jenkins --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")

echo http://$SERVICE_IP:8080/login

watch kubectl get all -n jenkins
watch kubectl get pods -n jenkins
kubectl logs -f demo-xxx -n jenkins
kubectl exec -ti demo-xxx -n jenkins -- /bin/sh

```

* [helm install jenkins](https://akomljen.com/set-up-a-jenkins-ci-cd-pipeline-with-kubernetes/)
* [read more ](https://cloud.google.com/solutions/jenkins-on-container-engine)

## Testing Jenkins

[Accessing docker sock from POD](https://estl.tech/accessing-docker-from-a-kubernetes-pod-68996709c04b)


```
 

kubectl run jenkins --namespace=jenkins --port=8080 --image=jenkinsci/blueocean:latest --overrides='
{
"apiVersion": "apps/v1",
  "spec": {
    "template": {
      "spec": {
        "containers": [
          {
            "name": "jenkins",
            "image": "jenkinsci/blueocean:latest",
            "args": [
              "bash"
            ],
            "stdin": true,
            "stdinOnce": true,
            "tty": true,
            "volumeMounts": [{
              "mountPath": "/var/run/docker.sock",
              "name": "dockersock"
            }]
          }
        ],
        "volumes": [{
          "name": "dockersock",
          "hostPath": "/var/run/docker.sock"
        }]
      }
    }
  }
}'

kubectl expose deployment jenkins --port=8080 --type=LoadBalancer -n jenkins

kubectl expose deployment jenkins --port=8080 --type=LoadBalancer -n jenkins

kubectl get pods -n jenkins

kubectl delete deployment -n jenkins



```

* [read about running](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)


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
