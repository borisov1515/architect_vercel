# Secure B2C Integration Guide

**Module:** Salesforce B2C Commerce Third-Party Integration Strategies  
**Source:** https://trailhead.salesforce.com/content/learn/modules/b2c-integration-approaches/b2c-ensure-integration-security  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Explain how the OSI seven-layer architecture relates to a secure Agentforce Commerce for B2C integration.

List the secure protocols you should consider for accessing third-party apps with a Agentforce Commerce for B2C storefront application.

Explain how to configure the two communication layers for communication between a storefront and an external web service.

List the steps a controller takes to connect a third-party app to Agentforce Commerce for B2C.

Explain how to import and store certificates.

Layers to Integrate

The Open Systems Interconnection (OSI) seven-layer architecture, developed in 1977, describes unique tasks per layer for network communication.

Third-party integration with Agentforce Commerce for B2C focuses on the OSI model’s transport and application layers.

Transport Layer

Establish a specific firewall connection between the third party and Agentforce Commerce for B2C.

Use transport layer certificates to identify both parties in a transaction.

Encrypt using HTTPS certificates.

If a web service is invoked via HTTPS, automatically use the client private key that’s stored in Business Manager, using hostname for that key.

Application Layer

Encrypt messages to the web service, or encrypt data in files sent to third parties.

Store certificates in a cartridge to use WS-Security to automatically encrypt/decrypt SOAP messages for web services.

Use authentication request headers with REST APIs.

Basic Authentication: Basic username / password (can be encoded).

OAuth: Limited temporary access using bearer tokens (that has expiry).

You learned about Web Services Security (WS-Security) in the Code and Customize a Web Service unit. Agentforce Commerce for B2C supports all features of the WS-Security standard except addressing.

Security Protocols

When deciding how to access third-party apps with a Agentforce Commerce for B2C storefront application, use secure protocols such as these as web service types.

Protocol

	

Description

HTTPS

	

Hypertext transfer protocol secure (HTTPS) is used for secure communication over a computer network, and is widely used on the internet.

SFTP

	

Secure shell (SSH) file transfer protocol (also secure file transfer protocol, or SFTP) is a network protocol that provides file access, file transfer, and file management over any reliable data stream. 

Basic Auth

	

In the context of an HTTP transaction, basic access authentication is a method for an HTTP user agent (for example, a browser) to provide a username and password when making a request. 

OAuth

	

Open authorization (OAuth) is an open standard that’s commonly used as a way for internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

Signing request at TLS layer

	

Transport layer security (TLS) encrypts data sent over the internet to ensure that eavesdroppers and hackers can’t see what you transmit, for example, passwords, credit card numbers, and personal correspondence. A signing request, involving private keys, is part of its handshake (authentication) process.

Signing SOAP requests

	

A simple object access protocol (SOAP) message is a special XML file with an <envelope>
copy element that contains an optional <header>
copy element and a mandatory <body>
copy element. It can have signed elements in the <header>
copy and in the SOAP <body>
copy elements. If the message handler is configured to expect a signed <body>
copy, it rejects with an error any SOAP message in which the <body>
copy is not signed.

A web service, typically used for a third-party integration, can also use a service credential, such as username and password, to perform HTTP basic authentication.

Configure the Layers

Agentforce Commerce for B2C third-party integration security is accomplished via encryption, using a client private key and a service certificate. Depending on the type of service you use, there can be additional signed and encrypted SOAP messages for the application layer. In this case, store a private key in storefront cartridge code and in Business Manager. Best practice is to use Business Manager. 

A cartridge is a container for packaging and deploying program code and data.

This diagram shows network layers in the connection process.

Transport: Save the keystore in Business Manager and use a certificate and private key in the handshake.

Application: Save the keystore in the cartridge and in Business Manager and use a signed and encrypted SOAP message for the handshake.

A keystore is a storage facility for cryptographic keys and certificates.

Notice the two important security protocols in this diagram.

Signing request at TLS layer

Signing SOAP requests

Create a Controller

To enact the process described in the above diagram, a developer creates a controller and a script that invokes the web service, creates SOAP messages, and signs or encrypts messages to the web service.

Step

	

Description

Invoke the web service

	

When the web service is invoked via HTTPS, Agentforce Commerce for B2C automatically uses the client private key stored in the instance in Business Manager, using the key’s host name.

Import the SSL certificates you use for two-factor authentication into the instance.

Use TLS certificates to communicate with web services or when using dw.net.HTTPClient
copy.

Create SOAP message

	

After the transport layer negotiation and handshake completes, the script sends a SOAP message to the web service.

Sign or encrypt messages to the web service

	

When you use the Agentforce Commerce for B2C web services implementation in the dw.ws
copy package, and the web service requires the encryption or signing of SOAP messages, Agentforce Commerce for B2C uses the X509 certificate stored in the instance keystore with the WSDL in the webreference2 folder in your cartridge.

The private key is usually stored in Business Manager in a site preference or custom attribute and referenced in the script, so that the private key doesn't have to be included directly in the script.

You can also use dw.net.httpClient
copy and the crypto package to send and sign a SOAP message if you can't use the Agentforce Commerce for B2C web services implementation. Salesforce doesn’t recommend this as a best practice. Use it only if you require the web service X509 certificate to be stored in the Business Manager instance.

Store Certificates

For both transport and application layer security, import private keys with certificates and trusted certificates into the Business Manager instance keystore. If you use WS-Security to automatically encrypt and decrypt SOAP messages, store these certificates in a cartridge.

When you import certificates into Business Manager, you also configure the additional information required when using keys and certificates, such as an alias or a service provider host name. The alias tells Agentforce Commerce for B2C which URL requires the certificate.

Private keys and certificates are stored per instance and can be used across all sites and organizations for that instance. You can store up to 50 entries (keys or certificates) in an instance key store. Each entry must have an alias. Key entries include both private keys and certificates. Once given, an alias can't be changed. To change it, you must remove the certificate from the keystore and reimport it.

Each private key can be associated with up to five host names. You can import these.

File types

	

Prefix

private key

	

.pfx or .p12

trusted certificates

	

.pem,.cer,.crt,.der

X509 certificates

	

No prefix

Once imported, the certificates are used whenever communicating with a web service via HTTPS.

If you can’t see the Certificates & Private Keys module in your Business Manager UI, see your administrator for access permission.

Script Methods for X.509 Certificates

In cryptography, X.509 is an International Telecommunication Union (ITU) standard that defines the public key certificate format. For Agentforce Commerce for B2C storefronts, script methods for X.509 certificates are stored in the instance keystore.

To perform signing and verification using the certificates stored in the instance keystore, use methods that include the KeyRef parameter in the method signature such as these.

dw.crypto.Signature.sign(String message, KeyRef privateKey, String digestAlgorithm)
copy
dw.crypto.Signature.signBytes(Bytes contentToSign, KeyRef privateKey, String digestAlgorithm)
copy
dw.crypto.Signature.verifySignature(String signature, String contentToVerify, CertificateRef certificate, String digestAlgorithm)
copy

Use the helper classes KeyRef
copy and CertificateRef
copy as references to keys in the keystore. They have a constructor that takes a string that’s an alias of a private key KeyRef
copy or a trusted certificate CertificateRef
copy in the keystore.

While a certificate is private, a trusted certificate is a public certificate issued from a trusted certificate authority.

Use Two Identifiers at Once

With the webReferences2 integration with WS-Security enabled, you can set values for signatureKeyIdentifier
copy and encryptionKeyIdentifier
copy using constants in the WSUtil
copy class, and use them at the same time.

For

	

Use

signatureKeyIdentifier
copy	WS_SIG_KEY_ID
copy
encryptionKeyIdentifer
copy	WS_ENC_KEY_ID
copy

See the B2C Commerce Script API documentation for the default values that webReferences2 uses and its permissible options.

View the Error Log

If you receive an error when using a certificate, take a look at the error log.

Open Business Manager.

Select Administration > Site Development > Development Setup > Log Files.

Review the log files.

Sometimes you need to scrub logs for sensitive information, such as with URLs written to the service framework's communication logs. If this happens, use dw.svc.ServiceCallback.filterLogMessage
copy to filter the request URL and the request and response bodies.

While log data is filtered to prevent the logging of sensitive data by default, you can enable it if necessary.

Next Steps

In this unit, you explored communications standards and protocols. You learned how a controller can securely connect third-party applications to Agentforce Commerce for B2C and how to import and store certificates. Next, get started with Agentforce Commerce for B2C Open Commerce API (OCAPI).

Resources
Trailhead: Salesforce B2C Commerce Cartridges
Salesforce Help: Log Files
Salesforce Help: Salesforce B2C Commerce API
External Link: International Telecommunication Union (ITU)
