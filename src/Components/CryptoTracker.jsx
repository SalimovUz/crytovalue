// components/CryptoTracker.js
import React, { useState, useEffect } from "react";

const CryptoTracker = () => {
  const [cryptoInput, setCryptoInput] = useState("");
  const [cryptoList, setCryptoList] = useState(["Dogecoin"]);

  const searchCrypto = () => {
    const loading = document.getElementById("loading");
    loading.textContent = "Biroz kuting";
    loading.style.color = "white";
    loading.style.fontSize = "25px";
    const time = () => {
      setTimeout(() => {
        loading.textContent = "Tayyor";
        loading.style.color = "green";
        loading.style.fontSize = "35px";
      }, 5000);
    };
    setTimeout(time, 100);
    // time();

    const cryptoName = cryptoInput.toUpperCase();
    if (!cryptoList.includes(cryptoName)) {
      addCryptoToList(cryptoName);
    } else {
      alert(`${cryptoName} allaqachon ro'yxatda mavjud.`);
    }
  };

  const addCryptoToList = (cryptoName) => {
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=9fb3d93a2c442eec138c2b85f44183440629576ae087ebd3dd6122d8cbb7101a`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCryptoList((prevList) => [...prevList, cryptoName]);
        setInterval(() => updateCrypto(cryptoName), 5000);
      })
      .catch((error) => {
        alert(`Ma'lumot olishda xatolik yuz berdi: ${cryptoName}`);
      });
  };

  const updateCrypto = (cryptoName) => {
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=9fb3d93a2c442eec138c2b85f44183440629576ae087ebd3dd6122d8cbb7101a`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const currentPrice = parseFloat(data.USD);
        const listItem = document.getElementById(cryptoName);
        listItem.style.color = "white";

        if (listItem) {
          const previousPrice = parseFloat(
            listItem.textContent.split(": $")[1]
          );

          if (currentPrice > previousPrice) {
            listItem.style.color = "green";
            listItem.style.fontSize = "30px";
          } else if (currentPrice < previousPrice) {
            listItem.style.color = "red";
          } else {
            listItem.style.color = "black";
          }

          listItem.textContent = `${cryptoName}: $${currentPrice}`;

          // const del = document.createElement("button");
          // del.textContent = "Delete";

          // del.addEventListener("click", (e) => {
          //   alert("Valyutani o'chirib yubordingiz endi qayta qo'sha olmaysiz!");
          //   e.target.parentElement.style.display = "none";
          // });
          // listItem.appendChild(del);
        }
      })
      .catch((error) => {
        alert(`Ma'lumot yangilashda xatolik yuz berdi: ${cryptoName}`);
      });
  };

  useEffect(() => {
    // Dogecoin uchun boshlang'ich ma'lumot olish
    updateCrypto("Dogecoin");
  }, []);

  return (
    <div className="container">
      <div className="crypto">
        <h1>Crypto Tracker</h1>
        <div className="search">
          <label htmlFor="cryptoInput">Enter the Crypto Value:</label>
          <input
            type="text"
            id="cryptoInput"
            placeholder="For example: BTC"
            value={cryptoInput}
            onChange={(e) => setCryptoInput(e.target.value)}
          />
          <button onClick={searchCrypto}>Search</button>
          <p id="loading"></p>
        </div>

        <div className="price">
          <h2>Crypto Values:</h2>
          <ol>
            {cryptoList.map((cryptoName) => (
              <li className="list" key={cryptoName} id={cryptoName}>
                {cryptoName}: $0.00
                {/* <button>Delete</button> */}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
