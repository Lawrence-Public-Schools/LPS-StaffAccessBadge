# LPS-StaffAccessBadge
Repository for Staff Access Badge

Testing to see if commits are being tracked

## Had trouble with more2.LPSstaffAccessBadge.leftnav.footer.txt:

Student Verison:
<script type="text/javascript">
$j(document).ready(function() {
$j( "ul#std_information > li > a[href^='state/stateMA.html?frn=']" ).parent().after($j('<li ><a href="LPS-earlycollege.html?frn=~(frn)">State Early College &tilde;</a></li>'));
});
</script>


<script type="text/javascript">
$j(document).ready(function() {
$j("ul#tchr_information > li > a[href^='photo.html?frn=']").parent().after($j('<li><a href="LPS-StaffAccessBadge.html?frn=~(frn)">Staff Access Badge</a></li>'));
});
</script>

Was not catching the difference from the #std_information and #tchr_information.  This means that the script was not targetting the correct list.