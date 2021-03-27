import store from './store';

export async function api_get(path) {
    let text = await fetch("http://localhost:4000/api/v1" + path, {});
    let resp = await text.json();
    return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
console.log(opts);
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
    api_get("/users").then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function fetch_posts(){
    api_get("/posts").then((data) => store.dispatch({
	    type: 'posts/set',
	    data: data,
    }));
}

export function load_defaults() {
    fetch_users();
    fetch_posts();
}

export function create_user(user) {
  return api_post("/users", {user});
}

export async function create_post(post) {
  let state = store.getState();
  let token = state?.session?.token;

  console.log("made it to create_post");
  console.log(post.date.toISOString());
  let data = new FormData();
  data.append("post[name]", post.name);
  data.append("post[description]", post.description);
  data.append("post[date]", post.date.toISOString());
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };
  let text = await fetch(
    "http://localhost:4000/api/v1/posts", opts);
  return await text.json();
}

export async function edit_post(post) {
  let state = store.getState();
  let token = state?.session?.token;

  console.log("made it to create_post");
  console.log(post.date.toISOString());
  let data = new FormData();
  data.append("post[id]", post.id);
  data.append("post[name]", post.name);
  data.append("post[description]", post.description);
  data.append("post[date]", post.date.toISOString());
  let opts = {
    method: 'POST',
    body: data,
    headers: {
      'x-auth': token,
    },
    // fetch will magically do the right thing
    // with our FormData:
    //  - It's going to read the file
    //  - It's going to pick correct headers
    //  - multipart-form-data
  };
  let text = await fetch(
    "http://localhost:4000/api/v1/posts", opts);
  return await text.json();
}

export function api_login(email, password) {
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

