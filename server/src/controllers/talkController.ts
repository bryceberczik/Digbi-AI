import axios from "axios";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.DID_AUTH_API;

export const createTalk = async (req: Request, res: any) => {
  try {
    const { source_url, script } = req.body;

    if (!source_url || !script) {
      return res
        .status(400)
        .json({ message: "Missing required fields: source_url or script" });
    }

    const response = await axios.post(
      "https://api.d-id.com/talks",
      { source_url, script },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error: any) {
    
    console.error("An error occurred while processing the request.");
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);

    res.status(error.response?.status || 500).json({
        message: "An error occurred while processing your request.",
        errorDetails: error.response?.data || "An unknown error occurred. Please try again later.",
    });
}
};

// import axios from 'axios';

// export const createTalk = async () => {
//   const options = {
//     method: 'POST',
//     url: 'https://api.d-id.com/talks',
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//       authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX2N1c3RvbWVyX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJvZHVjdF9uYW1lIjoidHJpYWwiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9zdWJzY3JpcHRpb25faWQiOiIiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9iaWxsaW5nX2ludGVydmFsIjoibW9udGgiLCJodHRwczovL2QtaWQuY29tL3N0cmlwZV9wbGFuX2dyb3VwIjoiZGVpZC10cmlhbCIsImh0dHBzOi8vZC1pZC5jb20vc3RyaXBlX3ByaWNlX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9zdHJpcGVfcHJpY2VfY3JlZGl0cyI6IiIsImh0dHBzOi8vZC1pZC5jb20vY2hhdF9zdHJpcGVfc3Vic2NyaXB0aW9uX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9jcmVkaXRzIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jaGF0X3N0cmlwZV9wcmljZV9pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vcHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwiaHR0cHM6Ly9kLWlkLmNvbS9pc19uZXciOmZhbHNlLCJodHRwczovL2QtaWQuY29tL2FwaV9rZXlfbW9kaWZpZWRfYXQiOiIyMDI1LTAxLTA0VDAyOjQ5OjAwLjIwM1oiLCJodHRwczovL2QtaWQuY29tL29yZ19pZCI6IiIsImh0dHBzOi8vZC1pZC5jb20vYXBwc192aXNpdGVkIjpbIlN0dWRpbyJdLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaHR0cHM6Ly9kLWlkLmNvbS9jcmVhdGlvbl90aW1lc3RhbXAiOiIyMDI1LTAxLTAzVDE5OjQ2OjE2LjA4N1oiLCJodHRwczovL2QtaWQuY29tL2FwaV9nYXRld2F5X2tleV9pZCI6InNwc2x6N2ZzcjkiLCJodHRwczovL2QtaWQuY29tL3VzYWdlX2lkZW50aWZpZXJfa2V5IjoickZyTk5SbGtyV25MM3VSNFpyZnA1IiwiaHR0cHM6Ly9kLWlkLmNvbS9oYXNoX2tleSI6IjY2TEhYdGN0aURtMm00U1dIRm9qVyIsImh0dHBzOi8vZC1pZC5jb20vcHJpbWFyeSI6dHJ1ZSwiaHR0cHM6Ly9kLWlkLmNvbS9lbWFpbCI6ImJyeWNlYmVyY3ppay5kZXZAZ21haWwuY29tIiwiaHR0cHM6Ly9kLWlkLmNvbS9jb3VudHJ5X2NvZGUiOiJVUyIsImh0dHBzOi8vZC1pZC5jb20vcGF5bWVudF9wcm92aWRlciI6InN0cmlwZSIsImlzcyI6Imh0dHBzOi8vYXV0aC5kLWlkLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTI5MzQ5NzUyMDY5MDE4MDEwMSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTk1OTUwNywiZXhwIjoxNzM2MDQ1OTA3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgb2ZmbGluZV9hY2Nlc3MiLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSJ9.oLAHGtrgrPiuc3J6jVyDdXUgOdASNO0sGAtOhms-9pZmrkPSfhMGJM_rL3rhhKg2gm5CsKPyQ4eDbRbqSir3pXggC8BOiBw6O-JJQ9HrXqwyiqXEKIAWfTG_GbzXdF7bxu41e9B-cJyVQbSjqjKx0t5bo4XiYdLZzhc7KhJIXWHCfkSczIIQMu0UrHGdRp4DxjRF6y-HJPbFhB-lmdiS90YwLrPPBQido-oSHOCZUhhDNwOc6bolVO5uDd9jxkTJZY_zrtxcGbneRol4CHdNmggInSkIaKAHkxRJ32h1p1ZwH_yGloMveLzzGjhud_EuTv9zaQAtKAwyaewelEgd-A',
//     },
//     data: {
//       source_url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       script: {
//         type: 'text',
//         subtitles: true,
//         provider: {
//           type: 'microsoft',
//           voice_id: 'Sara',
//           voice_config: { style: 'string', rate: '0.5', pitch: '+2st' },
//         },
//         input: "Hello world",
//         ssml: true,
//       },
//       config: {
//         logo: { position: [0, 500], url: 'string' },
//         fluent: true,
//         pad_audio: 0,
//         driver_expressions: {
//           expressions: [{ start_frame: 0, expression: 'neutral', intensity: 0 }],
//           transition_frames: 0,
//         },
//         align_driver: true,
//         align_expand_factor: 0,
//         auto_match: true,
//         motion_factor: 0,
//         normalization_factor: 0,
//         sharpen: true,
//         stitch: true,
//         result_format: 'mp4',
//         output_resolution: 512,
//       },
//       face: { top_left: [0, 0], size: 512 },
//       driver_url: 'bank://natural',
//       user_data: 'string',
//       name: 'string',
//       result_url: 'https://path.to.directory/',
//       persist: true,
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data; // Return the response data
//   } catch (err) {
//     console.error('Error occurred while creating the talk:', err);
//     throw err; // Re-throw the error for further handling
//   }
// };

// createTalk()
//   .then(result => console.log('Talk created successfully:', result))
//   .catch(error => console.error('Failed to create talk:', error));
