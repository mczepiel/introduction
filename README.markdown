introduction
============
Make your introduction to the group by printing out an honest-to-goodness
name label customized by you.

This application uses a DYMO label printer and the related SDK. It has been
tested with a LabelWriter 450 Turbo in Safari though much of the functionality
is in the DYMO SDK and printer drivers so YMMV.

1) From http://labelwriter.com/software/dls/sdk/js/DYMO.Label.Framework.latest.js
Install the latest DYMO Label Framework at the following location:
    node_modules/DYMO.Framework.latest.js

2) Install the correct SDK for your platform:
    http://sites.dymo.com/DeveloperProgram/Pages/Software_Development_Kit.aspx

This should eventually be unnecessary as the DYMO JS Library will not rely on the
NPAPI plugin.

Neither the library nor the SDK are provided as part of this project, developers
will need to evaluate and accept the DYMO licenses themselves.

A reference implementation can be found from DYMO:
http://labelwriter.com/software/dls/sdk/samples/js/VisitorManagement/VisitorManagement.html

Created for use by the Montage Developers of Silicon Valley Meetup group:
http://www.meetup.com/Montage-Developers-of-Silicon-Valley/