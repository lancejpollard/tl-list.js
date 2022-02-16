
# TL-List in JavaScript

This is really going to be used for record creation, and records are defined to have a fixed number of fields/links. So each `TLList` will be a single record with the fields in the tree/array.

There really won't be pushing and popping for records at least, but there may be pushing/popping for strings, which could be 1 to 256 64-bit values long to start (256 * 8 * 8 = 16384 UTF-8 characters). But could also use for smaller statically sized arrays if desired.
