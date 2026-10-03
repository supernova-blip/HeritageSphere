from saxonche import PySaxonProcessor

with PySaxonProcessor(license=False) as processor:

    xquery_processor = processor.new_xquery_processor()

    xquery_processor.set_query_content(
        open("xml/heritage.xq", encoding="utf-8").read()
    )

    xquery_processor.set_context(
        file_name="xml/heritage.xml"
    )

    result = xquery_processor.run_query_to_string()

    print("XQuery Result:")
    print(result)