from lxml import etree

# Load the XML document
tree = etree.parse("xml/heritage.xml")

# XPath query to get all monument names
monument_names = tree.xpath("//monument/name/text()")

print("Monuments found using XPath:")

for name in monument_names:
    print("-", name)