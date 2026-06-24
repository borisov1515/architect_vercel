# Download and Visualize Event Log Files Efficiently

**Module:** Event Monitoring  
**Source:** https://trailhead.salesforce.com/content/learn/modules/event_monitoring/event_monitoring_download  
**Saved:** browser extraction (logged-in session)

---

Learning Objectives

After completing this unit, you’ll be able to:

Download an event log file.

Describe the structure of event log files.

Explain how to use a cURL or Python script for downloading data.

Identify options for visualizing event log file data.

Download Event Log Files

You can use Developer Console to check your organization’s events and filter the events using criteria. But because you’re accessing the data through the application programming interface (API), you can also use other tools that make it easier to work with event log files. To maximize the benefits of Event Monitoring, download your event log files from Salesforce so that you can track them over time.

You can download event log files in several ways, including:

Direct download via the Event Log File (ELF) Browser application

cURL script

Python script

Let’s look at each approach.

Download Logs from Your Browser

Using the ELF Browser application is the most straightforward approach to downloading your organization’s Event Monitoring data. Let’s check it out.

Go to the Event Log File Browser in Setup. Select a date range.

From the dropdown list next to the event log file, select Download as CSV File.

If your organization doesn’t have any events in the specified date range or type, the page displays an error.

The list shows the same event log files that you see when you query the EventLogFile object. You can’t open the files in the browser application, but you can directly download them or use a script. 

Let’s look at the direct download method.

Click the  button to download a log to a comma-separated values (.csv) file. Each file contains all the events of a particular type that occurred in your organization in the past 24 hours or every hour for Event Monitoring customers.

Download the ReportExport log file. Open it in a spreadsheet, and let’s see what we can find.

If you don’t have any report export events, download another type of event log file or export a report and try this step again tomorrow. Events do not appear in the log file until at least 24 hours after they occur.

That looks much better! Now we can finally figure out how that confidential information got leaked. Let’s say that our lead report’s ID is 00O30000008a3De. The URI field contains the ID of the report that was exported, and the USER_ID field contains the ID of the user who exported that report. All of this information helps you pinpoint the culprit.

The user ID and the report ID are a match! You now have enough evidence to confirm that Rob Burgle exported the report. Now it’s time for justice to be served!

Download Event Log Files Using cURL

We know that you’re excited about cracking your first case, but this victory is only the beginning of your illustrious career as a Salesforce admin/detective. Each event type also has a  button that downloads a cURL script that you can run in your computer’s command line. cURL is one of many command-line tools that you can use to download data from your organization. The script downloads a .csv file exactly like the one you downloaded in the previous step. So, why use cURL instead of the direct download tool?

Although using cURL is more complicated than the first method, it provides more flexibility in working with event log files. Rather than manually downloading log files, you can schedule when to run the script so that you always have the most recent event log files for your organization. You can also transform your data so that it’s in a format you want. If your organization has an integration specialist, you can pass off these scripts to kick-start automation efforts.

cURL is best suited for Mac and Linux users. It’s possible to use it on Windows, but it requires extra configuration.

Using a cURL script to download your event log files requires the following.

Providing your Salesforce credentials

Logging in using OAuth and getting an access token

Using a REST query to specify which logs you’re looking for

If you’re scheduling a recurring download, this step is important. You can use something like this query to filter events by the current day.

Parsing the results of the query so that you can do things like create a date-based file structure—you can perform any transformations on your data that you want.

Download Event Log Files Using Python

If you need a more programmatic way of downloading your organization’s event log files, you can use Python scripts. One advantage of using a Python script over a cURL script is that it’s easier for Windows users to work with, but it’s also suitable for Mac and Linux users.

Python is easy to understand, even if you’re not an experienced programmer. Some setup is required, but after that you can easily run your download script. 

Visualize Event Log File Data

Now that you’ve taken the time to learn about event log files and how to download them from Salesforce, it’s time to talk about visualizing your data. Searching for a specific piece of information in thousands of rows in a spreadsheet is like searching for a needle in a haystack. Most of the time, it’s not useful to look for a single instance of a report export or user login. You’re probably more interested in noticing behavior that’s out of the ordinary. To get immediate insights into your organization’s inner workings, you can regularly download your event log files and create visual representations of your data.

Event Monitoring comes with the Event Monitoring Analytics app, a visualization tool for your log data. You can also use other tools to beautify your data. Some provide specific support for event log files, while others require more setup. We don’t go into the details of each platform, but check out this list for some ideas.

Event Monitoring Analytics app: This Analytics app is a way to get insights into your Event Monitoring data. Your data is automatically loaded from Salesforce to the app, so you always get the most recent (and most stunning) visualization of what’s going on in your org. The app provides a collection of dashboards that use pre-integrated event data, so it’s a great way to get started with Event Monitoring.

As part of Event Monitoring, you also get the Event Monitoring Analytics app. Use this app to upload and access only the data provided to you as part of your subscription. Please prevent your users from using the app to upload or access any other data. Salesforce sometimes monitors such usage. The Event Monitoring Analytics app is available in English only. Learn more at the links in this unit’s Resources section.

Splunk App for Salesforce: This app lets you analyze and visualize your organization’s use of Salesforce and gain insights into security, performance, and user behavior. The Splunk Add-on for Salesforce lets a Splunk software admin collect different types of data from Salesforce using REST APIs. It also provides the inputs to use with other Splunk apps, such as Splunk Enterprise Security.

FairWarning: This user activity monitoring solution is purpose-built to translate and correlate Salesforce log files across Event Monitoring, real-time streams, reference objects, and Change Data Capture (CDC) events. In doing so, it allows them to provide user-centric insights and real-time alerts on abnormal behavior. And that helps you proactively identify threats and mitigate risk to your Salesforce data. FairWarning supports multiple orgs in a single view, stores data beyond 30 days, and offers speed to value by getting your monitoring up and running in 48 hours. FairWarning insights can also be used for usage, adoption, and performance use cases to support a positive ROI on Event Monitoring and Salesforce. Available on the AgentExchange.

New Relic Insights: This solution for Salesforce makes it simple to understand the end-to-end business impact of your software performance. Automatically import your Event Monitoring data into Insights to power your easy-to-build dashboards and instantly query your data in the user interface.

You now have an idea of what Event Monitoring can do for your organization. You’ve used event log files to solve a case and seen the many possibilities for downloading and visualizing your organization’s events. Now you have the tools you need to investigate, secure, and improve your organization. Good luck, detective.

Resources
Salesforce Developer: Download Large Event Log Files Using cURL with REST
External Site: Salesforce Hacker: Downloading Event Log Files Using a Script
External Site: Salesforce Hacker: ElfPy—A Tasty Little Script for Downloading Event Log Files on Multiple Platforms
Salesforce Help: Event Log File Browser
Salesforce Help: Event Monitoring Analytics App
External Site: Splunk App for Salesforce
External Site: New Relic
Salesforce AgentExchange: FairWarning for Salesforce App
