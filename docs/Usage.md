# Further Usage

This documents contains other useful usage information. If there is anything else you would like to see appear in this document, let me know. These questions all assume you have read the readme


## Q / A

### How do I get a static IP?
The process of getting a static IP for your server almost always involves contacting your ISP. If you're apart of a larger network, contact your network or system administartor and go from there. 


### What is a DDNS and why do I need if I don't have a static IP?
A DDNS is just a service that updates the DNS with your public server IP. Your public IP will change with time, so this is needed if you don't want to constantly check everytime you want to access Cirrus. DDNS will update the DNS that has a domain name that you own, with the IP of your server as it changes.

### Which DDNS should I use?
There are many good (and some free) options for DDNS. Here are some ones I have seen used, in order of recommendation:

- [DuckDNS](https://www.duckdns.org/) (Free)
- [CloudFlare](https://www.cloudflare.com/learning/dns/glossary/dynamic-dns/)
- [ClouDNS](https://www.cloudns.net/dynamic-dns/#) (Free*)
  
**Note**: Some routers appear to provide their own DDNS service for a specified MAC address. This may be worth looking into if your router provides such services.

### How do I use a DDNS?
The process of confgiuring a DDNS depends widely on the service used. Refer to the documenation on whatver service you use 


### Wait, can I use Cirrus without a static IP or DDNS
Yes, it is possible to use Cirrus without a static IP or DDNS service. The big problem here is that the public IP address of you server will change over time. This is the IP you would type into your browser to access the server. In the future, I would really like to integrate a service that can be used to query the IP of your server, or report the most recent to an easily accessible format. (Maybe a script that gets it and automatically launches it in your browser?) I think anyone with some coding ability could probably implement a solution for this, but something like this would be necessary to run Cirrus on a server for a long period of time. 


## Port Mapping Table

This table outlines the port mappings for Cirrus

| Service   | Internal Port | External Port | Protocol | Purpose / Description                                    |
|-----------|---------------|---------------|----------|----------------------------------------------------------|
| Backend   | 3001          | 3001          | TCP      | Backend service, accessible directly for development     |
| Frontend  | 5173          | 5173          | TCP      | Frontend service, accessible directly for development    |
| Nginx     | 80            | 80            | TCP      | Nginx server routing `/api/` to backend and `/` to frontend |

*Note: Ports are mapped for both internal and external access. [Nginx](https://github.com/ReeseHatfield/Cirrus/blob/main/nginx.conf) handles routing to the appropriate service based on the request URL. You could change this if this conflicts with anything else on your server if need be*



## How can I know that me data is secure?

At the end of the day, your trusting some random developer's on github. You can look through the code yourself if you do not trust me (you probably shouldn't trust random people on the internet).

Passwords added via administrator console are both hashed and salted when before they are stored locally. So even if your server were to get breached, an attacker would not be able to know your password. Cirrus uses SHA256 hashing algorithm to hash your passwords. However, if you do not set up HTTPS on port 443 externally, they will be sent plaintext OTA.