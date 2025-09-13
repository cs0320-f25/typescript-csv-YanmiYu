# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- #### Step 2: Use an LLM to help expand your perspective.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    1.   Error Handling(Functionality, Both Claude and self): As a user, I want to have robust error message when encountering error so that I can receive a clear instruction when processing invalid data. 

    2. Escuated quote(Functionality, Self): As a user, I want to have the ability to use escuated quote in my CSV file so that I can include special characters(like quotation marked) in my data without breaking the CSV fomat.

    3. Newlines(Functionality, Self): As a user, I want to have the ability to use newlines in my CSV file so that I can include multi-line text in my data, like long paragraph and stories. Thus, we need a more comprehensive parser that do more then just line-by-line reading approach.

    4. Whitespace(Functionality, Claude): As a user, I want to have the ability to use whitespace in my CSV file so that I can include spaces and tabs in my data, like indented text and aligned columns while maintaining the data fomate of the CSV specification
   
    5. Data Type Conversion (Extensibility, New): As a user, I want the parser to automatically convert values to appropriate data types (numbers, dates, booleans) so that I don't have to manually convert strings after parsing.GPT also suggested adding support for data type conversion, which I do agree with. 

    NOTE: I used claude to help me with this task. The overall ideas are pretty much similar, everytimes I asked Claude mentioned about white space, empty data, escuated quote, error handling and new line. Data type conversion is sometimes not mentioned. 


### Design Choices


### 1340 Supplement
For the 1340 supplement, I implemented stack-parser to parse the CSV file. I choose stack because I believe if we can read the CSV line-by-line, then it will need less memory space, thus increasing the efficnecy of the overll function. 


- #### 1. Correctness
1. Data preservation: All the data from the CSV file should be preserved, including any special characters, whitespace, or newlines without lost of infomation
2. Error handling: The parser should handle errors gracefully, providing clear error messages and indicating the line number where the error occurred.
3. Edge cases: The parser should handle edge cases, such as empty fields, fields with only whitespace, and fields with special characters, without crashing or producing incorrect results(details see enhancement). Even if there are conditions the parser cannot handle, error message should be reported.
4. Data type conversion: The parser should automatically convert values to appropriate data types (numbers, dates, booleans) based on the CSV specification.                                                                                                                                    
- #### 2. Random, On-Demand Generation
- I think this will randomily genrated a large number of edge cases that a developer cannot think of when doing manual test. Also, introducing random variations and malformations can test robustness against unexpected inputs. It also test schema validation logic across many different input patterns. I will write more property-based tests that assert the parser's correctness properties hold for any generated input to ensure the parser handles a wide range of valid and invalid inputs correctly.


- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: 
Initially using too many type assertions instead of proper generic typing. Fixed by redesigning with proper generic type parameters. Also, if schema is not optional(if i do not put the ?), there will be error when calling parseCSV(An argument for 'schema' was not provided.)
#### Tests: 
I wrote unit tests for the parseCSV function using Jest. The tests cover various edge cases, including valid CSV data, invalid CSV data, empty files, and files with different delimiters. I think for next spring, I will include tests for the stack parser, which is used to parse the CSV file line by line. The tests for the stack parser should also cover scenarios such as empty lines, lines with only whitespace, and lines with special characters.

#### How To…
By adding ? to make my schema optional will solve the bug. Also, if schema is not provided, the parser should return a 2-d array of cell values.

#### Team members and contributions (include cs logins):
khjeong


#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
khjeong, ChatGPT, claude 3.7
Did not use coplite this time because I signed up github education pack late and whenever I try to use it, a message "Oops, your response got filtered. Vote down if you think this shouldn't have happened." pop up.

Where I used ChatGPT: task B step 3, idea for error handling, fix grammar on README
Where I used claude: task B step 3, idea for stack-parser, debug stack-parser. I also asked claude about the design choices and it mentioned about using zod for schema validation and stack parser for parsing CSV file. Also, I think stack parser is a good idea as it can help us to parse the CSV file line by line, which is more memory-efficient than reading the entire file into memory at once.

#### Total estimated time it took to complete project:
3

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-YanmiYu.git
