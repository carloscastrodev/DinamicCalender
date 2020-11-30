import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardAmigo from "../CardAmigo";
import "./ListaAmigos.css";

const ListaAmigos = ({
  friendList,
  authUserFriendlistIds,
  loadingAuthUserFriendList,
}) => {
  const [filteredFriendList, setFilteredFriendList] = useState([]);
  const [filterQuery, setFilterQuery] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (filterQuery !== "") {
      setFilteredFriendList(
        friendList.filter((friend) => {
          const friendFullname = `${friend.nome} ${friend.sobrenome}`;

          const regexpQuery = new RegExp(filterQuery, "ig");

          if (friendFullname.match(regexpQuery)) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      setFilteredFriendList(friendList);
    }
  }, [friendList, filterQuery]);

  return (
    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12 people-nearby my-profile-page-content-container-sizing">
      <h3 className="mb-3 text-center h4 my-blue-1 my-bolder">Amigos</h3>

      {friendList.length > 0 && (
        <input
          placeholder="Filtrar por nome..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="form-control my-1 p-2"
          type="text"
          name="filter-friends"
        />
      )}

      <ul className="people-nearby pt-0 overflow-auto h-75">
        {(loadingAuthUserFriendList && <i className="fas fa-spinner" />) || (
          <>
            {(filteredFriendList.length > 0 &&
              filteredFriendList
                .sort((a, b) =>
                  `${a.nome} ${a.sobrenome}`.localeCompare(
                    `${b.nome} ${b.sobrenome}`
                  )
                )
                .map((friend) => (
                  <CardAmigo
                    key={friend.idUsuario}
                    userInfo={friend}
                    mode="FRIENDLIST"
                    authUserFriendlistIds={authUserFriendlistIds}
                    loadingAuthUserFriendList={loadingAuthUserFriendList}
                  />
                ))) ||
              (friendList.length > 0 && (
                <p className="text-center">Nenhum amigo encontrado</p>
              ))}
          </>
        )}
        {!loadingAuthUserFriendList && friendList.length < 1 && (
          <>
            {(id && (
              <p className="text-center">
                Ainda não tem nenhum amigo{" "}
                <span role="img" aria-label="Emoji Triste">
                  😔
                </span>
              </p>
            )) || (
              <p className="text-center">
                Você ainda não tem nenhum amigo{" "}
                <span role="img" aria-label="Emoji Triste">
                  😔
                </span>
              </p>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default ListaAmigos;
