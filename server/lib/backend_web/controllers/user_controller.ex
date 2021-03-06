defmodule BackendWeb.UserController do
  use BackendWeb, :controller
 
  alias Backend.Users
  alias Backend.Users.User

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

# based on lecture code
  def create(conn, %{"user" => user_params}) do
    test = Argon2.add_hash(user_params["password"])
    test = Map.put(test, "name", user_params["name"])
    test = Map.put(test, "email", user_params["email"])
    updated_params = %{"name": user_params["name"], "email": user_params["email"], "password_hash": test.password_hash}
    with {:ok, %User{} = user} <- Users.create_user(updated_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
