# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.
z
## Your Explanation Here

To clean up the existing code, I extracted it into 2 functions. The parent function is shortened and has minimal branching logic to make it easier to read. Most of the original code's complication was due to branching logic. The code generates / formats the partition key depending on 2 condiditons:

1. the existence of an event
2. if the event provides a partition key

As part of the refactor I first handled case 1) at the very beginning of the function. That way the code can either return a default value, or proceed without needing to consider that case any further.

Next, I identify the data we will use as a partition key, and then format the key with `formatPartitionKey`. If the reader needs to get into the details of how a key is formatted they can read into the method, but the basic flow of creating a deterministic partition key from an event is now read in 10 lines.
