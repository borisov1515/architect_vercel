# Get Started with Secret Protection

**Module:** Secure Secrets Storage  
**Source:** https://trailhead.salesforce.com/content/learn/modules/secure-secrets-storage/get-started-with-secret-protection-1  
**Saved:** browser extraction (logged-in session)

---

## Learning Objectives

After completing this unit, you'll be able to:

- Explain what application secrets are.
- Explain who you need to keep application secrets from.
- List three risks of exposing application secrets to Salesforce admins.

## What Are Secrets?

Virtually every application handles sensitive data of one kind or another—whether it's the password a user enters to authenticate to the application or an encryption key that protects data at rest. These are called application secrets. If attackers or malicious users get access to the secret, they can use it to access confidential information or systems.

How to secure secrets is important for developers to consider on any platform, including Salesforce. In this module, you learn how to identify secrets in your applications and determine the most effective method for storing and protecting those secrets.

Here are some common examples of secrets—data that can be used to verify a user's privileges in a given situation.

- Passwords and passphrases
- Encryption and API keys
- OAuth tokens

In addition to these examples, your business can consider other forms of data as secret and subject to additional protection. For example, you can be under a regulatory requirement to encrypt some types of user data.

## Who Are You Protecting Secrets From?

Now that you know what must be protected, consider who you protect this information from. Maybe you're imagining an attacker. You want to safeguard sensitive data from external attackers who try to break into your Salesforce instance. But also consider the risks of exposing secrets to other users, including Salesforce admins, AgentExchange developers, and customers.

Consider these scenarios.

- A user accidentally downloads malware, and their Salesforce session is compromised.
- A disgruntled employee was recently laid off but still has access to their company's systems.
- A Communities CRM user discovers they have privileged API access.

In each scenario, an improperly protected secret can become visible to someone who should not have access to it. For these reasons, it's a good idea to protect secrets from different types of users, including:

- **Standard users:** Users with normal Salesforce licenses and average permissions
- **External users:** Users with reduced permissions, potentially using a Communities license or viewing data through a Force.com site
- **Administrator users with administrative access:** Users with normal Salesforce licenses but above average permissions, up to Modify All Data

Remember that not every secret needs to be protected from every type of user. This module aims to give you tools to protect application secrets so that even the most sensitive data can be safely stored in Salesforce.

## Why Protect Secrets from Admins?

Admins are in positions of greater trust than other users because they have a higher level of access to the system. Adhere to the principle of least privilege: Grant only the bare minimum of privileges that a user, program, or process needs to perform their assigned function. Granting admin access to additional items like encryption keys can seem harmless, but here are some things to consider.

- If a stored secret is the password to an external service, the Salesforce admin might not be authorized to access the service directly. So, to protect that service, you want to ensure they cannot access the password.
- The stored secret can be an encryption key that no user, including the admin, can access. And so, again, you want to ensure an admin can't access it.
- If an admin has access to the secret, an attacker can try to get the secret by compromising the admin's account.

Just because someone can access something doesn't mean they should!

Now that you know how important it is to secure secrets, you can determine the most effective method for storing and protecting them as you develop your application. Next, look at how to use the Salesforce Platform security features.

## Resources

- Knowledge Article: Storing Sensitive Data
