import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const QUOTED_CSV_PATH = path.join(__dirname, "../data/test-quoted.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/test-empty.csv");
const ESCAPED_QUOTES_CSV_PATH = path.join(__dirname, "../data/test-escaped-quotes.csv");
const WHITESPACE_CSV_PATH = path.join(__dirname, "../data/test-whitespace.csv");
const NEWLINES_CSV_PATH = path.join(__dirname, "../data/test-newlines.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV handles quoted fields with commas", async () => {

  const results = await parseCSV(QUOTED_CSV_PATH);
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["name", "quote"]);
  expect(results[1]).toEqual(["Caesar", "veni, vidi, vici"]);
  expect(results[1][1]).toBe("veni, vidi, vici");
});

test("parseCSV should handle escaped quotes in quoted fields", async () => {
  // Create a test file with escaped quotes
  
  const results = await parseCSV(QUOTED_CSV_PATH);
  expect(results[2][1]).toBe('This has "quotes" inside');
});

test("parseCSV handles empty fields", async () => {
  const results = await parseCSV(EMPTY_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["col1", "col2", "col3"]);
  expect(results[1]).toEqual(["data1", "", "data3"]);
  expect(results[2]).toEqual(["", "data2", ""]);
});


test("parseCSV handles escaped quotes in quoted fields", async () => {
  const results = await parseCSV(ESCAPED_QUOTES_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["header1", "header2"]);
  expect(results[1]).toEqual(["normal quoted", "quoted with \"escaped\" quotes"]);
  expect(results[2]).toEqual(["multiple \"escaped\" quotes", "text with \"quotes\" inside"]);
});

test("parseCSV should preserve whitespace in quoted fields but trim unquoted fields", async () => {
  const results = await parseCSV(WHITESPACE_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["header1", "header2"]);
  expect(results[1]).toEqual(["value with space", "another value"]); // Unquoted fields should be trimmed
  expect(results[2]).toEqual([" quoted with space ", "  double space  "]); // Quoted fields should preserve whitespace
});


test("parseCSV should handle quoted fields with newlines", async () => {
  const results = await parseCSV(NEWLINES_CSV_PATH);
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["header1", "header2"]);
  expect(results[1]).toEqual(["line one\nline two", "simple value"]);
  expect(results[2]).toEqual(["multiple\nline\nvalue", "another\nvalue"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});
