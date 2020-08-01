FROM httpd:latest
MAINTAINER Chen, Hong-Wun from SELab in Department of CSIE, NTU
ADD build/dist/ /usr/local/apache2/htdocs/
