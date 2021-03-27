defmodule Backend.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :name, :string
      add :date, :naive_datetime
      add :description, :text
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
