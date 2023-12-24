# *Cirrus*
<p align="center">
  <a href="https://github.com/reesehatfield/cirrus">
    <img src="./frontend/public/cirrus.png" alt="Cirrus Logo" width="400" height="370">
  </a>
</p>

<h3 align="center"><strong>Cirrus</strong></h3>

<p align="center">
  Your personal, secure, and powerful self hosted cloud application
  <br>
</p>

# What is Cirrus?

Cirrus is like a self-hosted Google Drive. It's a personal file host that you can use to securely access and store your files as you need them.

# Getting Started

To get started you'll need a few things:
- A server (AWS works fine, but your own server works best)
- Static IP or Dynamic DNS Service
- Docker
- NodeJS and Typescript*
- Firewall configured

## Server
For your server, you could theorically use any old desktop. For this guide, I'll assume your using Ubuntu, but other operating systems could also work. As long as it has networking capabilities and decent hardware, it should work fine.

## Static IP or Dynamic DNS Service
If you are already in good relations with your ISP, it would be best to reach out for a static IP address for your server. But that could come with extra costs that we are trying to avoid. Instead, you can keep your dynamic, public server IP and use a DDNS service (with a domain name if you have one) to update and point to your Server. 
</br>
</br>
Note: it is techincally possible to use Cirrus without either of these options. You would just have to set up a way to always know the IP from any other device. If you do plan on using Cirrus for personal use, I recommend doing this last, and to make sure it is working, before you contact your ISP or configure DDNS


## Firewall Configured
To get public access to your server through the internet, you'll need configure the firewall on your server. Specfically, you need to open a few ports to allow traffics from other devices. We'll do this with UFW.

1. Install UFW: `sudo apt-get install ufw`
2. Enable UFW: `sudo ufw enable`
3. Allow HTTP and HTTPS: `sudo ufw allow 80/tcp` and `sudo ufw allow 443/tcp`
4. Check status: `sudo ufw status`

When your check the status, it should show the ports we need as open.


## Docker

To run the server's containers, you need to install Docker. A full docker installation guide can be found [Here](https://docs.docker.com/engine/install/)

## Running the server
To actually run the Cirrus on your server, you'll first need to clone the repo with

`git clone https://github.com/ReeseHatfield/Cirrus.git`




Need:
- Static ip for server
- new address that's not localhost
- docker
- Server (AWS or home server)
- firewall configured
- https://iconoir.com/
- add user with bash script + making it executable
  - docker build -t admin .
  - docker run admin
- port map
  - 3001 -> backend
  - 5173 -> frontend



Todo:
- Login:
  - Login page
  - signout button
- Ignore .gitrootplaceholder
- Stlying:
  - files
  - display
  - login page
- Highlighting on click



