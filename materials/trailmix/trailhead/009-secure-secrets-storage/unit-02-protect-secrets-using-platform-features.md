# Protect Secrets Using Platform Features

**Source:** https://trailhead.salesforce.com/content/learn/modules/secure-secrets-storage/protect-secrets-using-platform-features  
**Saved:** browser extraction (logged-in session)

---

## Learning Objectives

After completing this unit, you'll be able to:

- List the options and recommended practices for storing secrets within managed packages.
- Create named credentials to define callout endpoints and their associated authentication parameters securely.
- Describe how protected custom settings and metadata API fields can be used to store secrets.

## Store Application Secrets in Salesforce

In the previous unit, you learned how to identify secrets and who should have access to them. The next step is to learn how to protect them.

This Salesforce Platform has a number of features that can be used to store and protect secrets, including:

- Named credentials
- Custom settings (protected, unprotected, unmanaged, and managed)
- Custom metadata types

In this unit, you learn about each of these options for storing secrets so you can ensure that sensitive information is appropriately restricted.

## Named Credentials

Named credentials are a mechanism for securely managing authentication values for external providers and services. They provide standard authentication implementation processes in a set of secure and manageable entities. Salesforce manages all the authentication for Apex callouts that specify a named credential as the callout endpoint, and you don't have to add more authentication logic in your Apex code.

Named credentials are useful when defining callout endpoints referenced in your managed package. Without them, in order to set up an authenticated callout, the developer needs to:

- Reference the URL as the callout endpoint.
- Register the URL in your remote site settings.
- Add custom code to take care of any associated authentication tasks.

**Problems with hardcoding secrets:** Anyone who can view source code can view embedded secrets; updates require changing all instances; porting between applications creates complications.

**Benefits:** Restrict access to secrets; change values in settings without code changes.

**Best for:** Standard authentication protocols (username/password, OAuth 2.0, AWS Signature Version 4, signed JWTs).

**Limitation:** Users with Modify All Data or Author Apex can modify named credentials and potentially access protected data. For ISV packages needing admin isolation, use managed protected custom settings or custom metadata types.

### New Named/External Credential Functionality

External Credentials represent authentication details with an external system; Named Credentials act as logical connections/callout endpoints. Permission Sets authorize users; principals map to permissions; User External Credentials store encrypted tokens. Custom Headers can be added to both.

## Secure Distributed Secrets

For preventing admin access or distributing secrets across orgs, deploy code as a **managed package** (Developer Edition packaging org).

Managed package security benefits:

- Automatic updates/patches for vulnerabilities
- Obscured source code (except exposed global Apex)
- Unique namespace segregation; package secrets not accessible from outside code by default

## Managed Protected Custom Settings and Custom Metadata Types

**Custom settings** store data in application cache. **Protected** custom settings in managed packages are not visible to subscribers via Apex/API — good for secrets.

**Custom metadata types** with Protected visibility in managed packages are ideal for API keys. Metadata deploys with the package (unlike custom field data).

### Visibility options

- Public (local), Protected (local), Public (managed), Protected (managed)
- For secrets: use **Protected (managed)** only.

### When to use which

**Custom settings when:**

- Secret must update frequently and be available immediately (metadata deploy is async)
- Profile/user-level granularity needed

**Custom metadata types when:**

- Deploy common secret without extra configuration
- Easy migration sandbox → production without post-install scripts

## Resources

- Apex Developer Guide: Named Credentials as Callout Endpoints
- How to use custom metadata types to save years of development on app configurations
- Apex Developer Guide: Custom Settings Methods
- Define Custom Settings
