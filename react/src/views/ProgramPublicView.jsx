import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import PublicQuestionView from "../components/PublicQuestionView";

export default function ProgramPublicView() {
  const [answers, setAnswers] = useState({});
  const [programFinished, setProgramFinished] = useState(false);
  const [program, setProgram] = useState({
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`program/get-by-slug/${slug}`)
      .then(({ data }) => {
        setLoading(false);
        setProgram(data.program);
        setProgramFinished(data.user_answer);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  // function answerChanged(question, value) {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [question.id]: value,
  //   }));
  // }

  // function onFileChange(event, question) {
  //   const selectedFiles = Array.from(event.target.files); // Ambil array dari file yang dipilih
  //   selectedFiles.forEach((file) => {
  //     // Menyimpan informasi file di dalam answers
  //     answerChanged(question, {
  //       ...answers[question.id],
  //       file: file,
  //     });
  //   });
  // }

  // function onSubmit(ev) {
  //   ev.preventDefault();
  //   const formData = new FormData();
  //   Object.keys(answers).forEach((questionId) => {
  //     const answer = answers[questionId];
  //     formData.append(`answers[${questionId}]`, answer);
      
  //     if (answer.file) {
  //       formData.append(`files[${questionId}]`, answer.file);
  //     }
  //   });
    
  //   // Debug: Log the FormData entries
  //   console.log(Array.from(formData.entries()));
  //   // debugger
  //   // axiosClient
  //   //   .post(`/program/${program.id}/answer`, formData, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //     },
  //   //   })
  //   //   .then((response) => {
  //   //     setProgramFinished(true);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error:", error);
  //   //   });
  // }

  // const handleChange = (question, e) => {
  //   if (!e || !e.target) {
  //     console.error("Event or target is undefined");
  //     return;
  //   }
    
  //   const { value, files } = e.target;
  //   answerChanged(question, files ? files[0] : value);
  // };

  const answerChanged = (question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question.id]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in answers) {
      form.append(`answers[${key}]`, answers[key]);
    }
    // console.log(Array.from(form.entries()));

    try {
      await axiosClient.post(`/program/${program.id}/answer`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setProgramFinished(true);
      })
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      {loading && <div className="flex justify-center">Loading..</div>}
      {!loading && (
        // <form onSubmit={(ev) => onSubmit(ev)} className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
          <div className="grid grid-cols-6">
            <div className="col-span-5">
              <h1 className="text-3xl mb-3">{program.title}</h1>
              <p className="text-gray-500 text-sm mb-3">
                Expire Date: {program.expire_date}
              </p>
              <p className="text-gray-500 text-sm mb-3">{program.description}</p>
            </div>
          </div>

          {programFinished ? (
            <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mt-5">
              Thank you for participating in the program
              <br />
            </div>
          ) : (
            <>
              <div className="my-3 bg-slate-50 p-8 rounded-lg">
                {program.questions.map((question, index) => (
                  <PublicQuestionView
                    key={question.id}
                    question={question}
                    index={index}
                    // answerChanged={(e) => handleChange(question, e)}
                    answerChanged={(value) => answerChanged(question, value)}
                    // onFileChange={(event) => onFileChange(event, question)} // Pass onFileChange function down
                  />
                ))}
              </div>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
