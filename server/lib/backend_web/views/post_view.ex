defmodule BackendWeb.PostView do
  use BackendWeb, :view
  alias BackendWeb.PostView
  alias BackendWeb.UserView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    user = if Ecto.assoc_loaded?(post.user) do
      render_one(post.user, UserView, "user.json")
    else
      nil
    end

    IO.puts "made it to the render function"
    %{id: post.id,
      name: post.name,
      date: post.date,
      user: user,
      description: post.description}
  end
end
