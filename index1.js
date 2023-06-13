import fetch from 'node-fetch';
const dsMessage = "Imagine banning me in molvit`";

try {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `i will provide you a message, " +
        "and you will need to rate it from 10 to -10" +
        " using following criteries: intelligibility, toxicity, length and your personal opinion. " +
          "Here is the message : ${dsMessage}`,
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }

  // setResult(data.result);
  // setAnimalInput("");
  //
  console.log(data.result);


} catch(error) {
  // Consider implementing your own error handling logic here
  console.error(error);
}



[
  {
    message: {
      role: 'assistant',
      content: 'Intelligibility: 10\n' +
          'Toxicity: 0\n' +
          'Length: 4\n' +
          'Personal opinion: 5\n' +
          '\n' +
          'Overall rating: 4.75'
    },
    finish_reason: 'stop',
    index: 0
  }
]
