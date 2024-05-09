import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import NewCollections from '../Components/NewCollections/NewCollections';


const Shop = () => {
  const [ setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);
  const [promoCategory, setPromoCategory] = useState(null);
  const [idPadre, setidPadre] = useState(null);
  const [nombreCat, setNombreCat] = useState(null);
  const [promo, setPromo] = useState(null);
  const [desc, setDesc] = useState(null);
  const [showHero, setShowHero] = useState(false);

  const fetchPromoCategory = async () => {
    try {
      const response = await fetch(' https://1ab1-2800-98-1116-780-f9ba-be07-9e81-945e.ngrok-free.app/promo-category');
      const data = await response.json();
      if (data.ID_CATEGORIA != null) {
        setPromoCategory(data.ID_CATEGORIA);
        setidPadre(data.ID_CATEGORIA_PADRE);
        setNombreCat(data.NOMBRE_CATEGORIA);
        setPromo(data.NOMBRE);
        setDesc(data.DESCRIPCION);
        setShowHero(true); // Mostrar el Hero si hay una promoción activa
      } else {
        setShowHero(false); // Ocultar el Hero si no hay promociones activas
      }
    } catch (error) {
      console.error('Error fetching promo category:', error);
    }
  };

  useEffect(() => {
    fetchPromoCategory();
  }, []);

  const fetchInfo = () => {
    fetch(' https://1ab1-2800-98-1116-780-f9ba-be07-9e81-945e.ngrok-free.app/popularinwomen')
      .then((res) => res.json())
      .then((data) => setPopular(data));

    // Modifica la URL para obtener los productos más recientes desde Express.js
    fetch(' https://1ab1-2800-98-1116-780-f9ba-be07-9e81-945e.ngrok-free.app/productos-recientes') // Cambia esta URL
      .then((res) => res.json())
      .then((data) => setNewCollection(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      {showHero && <Hero promoCategory={promoCategory} idPadre={idPadre} nombreCat={nombreCat} promo={promo} desc={desc} />}
      <NewCollections data={newcollection} />
    </div>
  );
};

export default Shop;
