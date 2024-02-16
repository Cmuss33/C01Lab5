test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // Code here
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    const getAllNotesRes = await fetch (`${SERVER_URL}/getAllNotes`, {
       method: "GET",
       headers: {
       "Content-Type": "application/json",
       },
    });
    const getAllNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response).toStrictEqual([]);
  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    // Code here   
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });

    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "2",
      content: "2",
      }),
    });

    const postNoteBody = await postNoteRes.json();
    const postNoteBody2 = await postNoteRes2.json();

    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
    expect(postNoteRes2.status).toBe(200);
    expect(postNoteBody2.response).toBe("Note added succesfully.");

    const getNoteRes = await fetch (`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      },
    });

    const getNoteBody = await getNoteRes.json();

    expect(getNoteRes.status).toBe(200);
    expect(getNoteBody.response.length).toBe(2);

    const deleteAllNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody2 = await deleteAllNotesRes2.json();
  });
  
  test("/deleteNote - Delete a note", async () => {
    // Code here
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const noteID = postNoteBody.insertedId;

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/` + noteID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteNoteBody = await deleteNoteRes.json();
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe("Document with ID " + noteID + " deleted.");
    
  });
  
  test("/patchNote - Patch with content and title", async () => {
    // Code here
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const noteID = postNoteBody.insertedId;

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/` + noteID, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "Updated Title",
      content: "Updated Body",
      }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe("Document with ID " + noteID + " patched.")
  });
  
  test("/patchNote - Patch with just title", async () => {
    // Code here
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const noteID = postNoteBody.insertedId;

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/` + noteID, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "Updated Title",
      }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe("Document with ID " + noteID + " patched.")
  });
  
  test("/patchNote - Patch with just content", async () => {
    // Code here
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const noteID = postNoteBody.insertedId;

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/` + noteID, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      content: "Updated Body",
      }),
    });

    const patchNoteBody = await patchNoteRes.json();
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe("Document with ID " + noteID + " patched.")
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    // Code here
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteAllNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody2 = await deleteAllNotesRes2.json();
    expect(deleteAllNotesRes2.status).toBe(200);
    expect(deleteAllNotesBody2.response).toBe("1 note(s) deleted.");

  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    // Code here
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody = await deleteAllNotesRes.json();

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
    
    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody2 = await postNoteRes2.json();
    expect(postNoteRes2.status).toBe(200);
    expect(postNoteBody2.response).toBe("Note added succesfully.");

    const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody3 = await postNoteRes3.json();
    expect(postNoteRes3.status).toBe(200);
    expect(postNoteBody3.response).toBe("Note added succesfully.");

    const deleteAllNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteAllNotesBody2 = await deleteAllNotesRes2.json();
    expect(deleteAllNotesRes2.status).toBe(200);
    expect(deleteAllNotesBody2.response).toBe("3 note(s) deleted.");
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Code here
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      title: "1",
      content: "1",
      }),
    });
    const postNoteBody = await postNoteRes.json();
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
    
    noteID = postNoteBody.insertedId;

    const updateColorRes = await fetch(`${SERVER_URL}/updateNoteColor/` + noteID, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      color: "#FF0000",
      }),
    });

    updateColorBody = await updateColorRes.json();
    expect(updateColorRes.status).toBe(200);
    expect(updateColorBody.message).toBe("Note color updated successfully.")

  });