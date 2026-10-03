from lxml import etree

# Load the XML schema
schema_doc = etree.parse("xml/heritage.xsd")
schema = etree.XMLSchema(schema_doc)

# Load the XML document
xml_doc = etree.parse("xml/heritage.xml")

# Validate XML against the schema
if schema.validate(xml_doc):
    print("XML validation successful!")
else:
    print("XML validation failed.")
    print(schema.error_log)