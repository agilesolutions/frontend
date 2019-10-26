# HELM charts to get deployed through Octopus
These are the HELM charts to get our business applications deployed on Kubernetes clusters, automated through Octopus Deploy
 

## basic instruction to deploy
Run this from Octopus Deploy shell script

```
git clone https://bitbucket.agilesolutions.com/scm/res/charts.git
cd charts/demo
copy in the application.yaml generated from Octopus template
helm install or upgrade --name demo --set version={VERSION TO BE RELEASED},ingress.domain={DNS NAME FOR REVERSED PROXY} .
```
