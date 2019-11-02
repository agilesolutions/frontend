# Package and Deploy Springboot applications with HELM 
Demonstrates how to deploy Springboot apps with HELM and inject environment specific (DEV/UAT/PROD...) application configuration on a kubernetes configmaps.

## Run this demonstration

* goto [Katacoda HELM course page](https://www.katacoda.com/courses/kubernetes/helm-package-manager)
* [goto play with k8s](https://labs.play-with-k8s.com/)
* docker run -ti --rm gcr.io/kaniko-project/executor --Dockerfile=Dockerfile --context=/usr --destination=agilesolutions/frontend:latest
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

## APPLYING jenkins

* [cheat](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
* [Stackoverflow mounting docker sock](https://stackoverflow.com/questions/45165855/kubernetes-configure-deployment-to-mount-directory-from-local-kubernetes-host)
* [About k8s HOSTPATH](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)
* [Run Jenkins in secure mode](https://devops.stackexchange.com/questions/2506/docker-in-kubernetes-deployment)
* [nice picture on skaffold](https://www.ibm.com/cloud/container-service?cm_mmc=Search_Google-_-Hybrid+Cloud_Cloud+Platform+Digital-_-WW_IDA-_-%2Bkubernetes_b&cm_mmca1=000023UA&cm_mmca2=10010608&cm_mmca7=1003284&cm_mmca8=kwd-88228236663&cm_mmca9=EAIaIQobChMIgt7otYO85QIV2ON3Ch3k-wsHEAAYASAAEgI4rfD_BwE&cm_mmca10=376193097037&cm_mmca11=b&gclid=EAIaIQobChMIgt7otYO85QIV2ON3Ch3k-wsHEAAYASAAEgI4rfD_BwE&gclsrc=aw.ds)

[FIXING ACCESS DENIED ACCESSING DOCKER SOCKETS](https://stackoverflow.com/questions/56270070/permission-denied-when-connecting-to-docker-daemon-on-jenkinsci-blueocean-image)


```

cd k8s

kubectl create namespace jenkins

apply -f deployment.yml

kubectl get pods -n jenkins

kubectl logs -f jenkins-f59b6b886-xbxkf -n jenkins

kubectl exec -ti jenkins-f59b6b886-xbxkf -n jenkins /bin/sh

kubectl describe deployment jenkins -n jenkins

kubectl edit deployment jenkins -n jenkins

watch kubectl get pods -n jenkins

kubectl delete deployment -n jenkins

```

## Problems Jenkins accessing docker sockets on kubernetes host

Running on my PC

```
kubectl port-forward --namespace jenkins jenkins-fcc8d68c5-qcdh8 8080:8080

http://localhost:8080
```


```
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.39/containers/maven:3-alpine/json: dial unix /var/run/docker.sock: connect: permission denied
11:58:29.903481 durable_task_monitor.go:63: exit status 1
```
[usermod -a -G docker jenkins](https://stackoverflow.com/questions/47854463/got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket-at-uni)
[RUN AS PROVILEGED USER security-contex](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)


## Testing Jenkins

* [Accessing docker sock from POD](https://estl.tech/accessing-docker-from-a-kubernetes-pod-68996709c04b)
* [GITHUB docker in docker to build containers](https://github.com/kubeflow/pipelines/issues/561)
* [Anoter one](https://github.com/argoproj/argo/issues/826)

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
