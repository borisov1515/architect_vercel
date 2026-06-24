# Use Encryption in Custom Applications

**Source:** https://trailhead.salesforce.com/content/learn/modules/secure-secrets-storage/use-encryption-in-custom-apps  
**Saved:** browser extraction (logged-in session)

---

## Learning Objectives

After completing this unit, you'll be able to:

- Describe the Apex Crypto class.
- Explain the different use cases for the Apex Crypto class and custom encryption.
- Implement encryption in your own application.

## What Is the Apex Crypto Class?

When it comes to implementing encryption in your Salesforce application, Apex gives you the flexibility to write your own custom cryptographic functions while granting you the ability to use a wide range of prebuilt functions. In this unit, you learn some of the powerful functions Salesforce offers for creating digests, message authentication codes (MACs), signatures, and encryption and decryption functions through the Apex Crypto class.

The Crypto class provides sets of functions that are particularly valuable for safeguarding your communications. Using these functions, you can effectively shield confidential data from eavesdroppers, verify that message data is complete and unmodified, and verify the authenticity of senders and receivers.

## Encryption and Decryption to Protect Confidentiality

`Crypto.Encrypt()` and `Crypto.Decrypt()` support AES128, AES192, and AES256 algorithms. Use `Crypto.generateAESKey(Integer keylength)` or your own key. Store keys in protected custom metadata types or protected custom settings.

## Hash Digests to Protect Integrity

`Crypto.generateDigest()` supports MD5, SHA1, SHA256, and SHA512. Salesforce suggests SHA2 or higher (MD5 is weak).

## Hash-Based Message Authentication Codes (MACs)

`Crypto.generateMac()` creates MACs/HMACs (HMACMD5, HMACSHA1, HMACSHA256, HMAC512). Used in TLS and IPSec for sender authentication and integrity.

## Creating a Digital Signature

`Crypto.sign()` uses algorithm and private key; receiver verifies with public key.

**WARNING:** Cryptography and key management are high-risk. Have work reviewed by an application security professional with cryptographic experience.

## Resources

- Apex Developer Guide: Crypto Class
