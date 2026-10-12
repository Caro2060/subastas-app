import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export const CreateAuction = () => {

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [hours, setHours] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [condition, setCondition] =
    useState("");

  const [image, setImage] =
    useState("");
  
    const [minutes, setMinutes] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  const durationMinutes =
    Number(hours) * 60 + Number(minutes);

  if (durationMinutes < 1) {
    alert("La duración debe ser de al menos un minuto.");
    return;
  }

  Meteor.call(
    "createAuction",
    {
      title,
      price: Number(price),
      image,
      description,
      category,
      condition,
      durationMinutes,
    },
    (error) => {
      if (error) {
        alert(error.reason || "No se pudo crear la subasta.");
        return;
      }

      alert("Subasta creada.");
      setTitle("");
      setPrice("");
      setHours("");
      setMinutes("");
      setImage("");
      setDescription("");
      setCategory("");
      setCondition("");
    }
  );
};

  return (

    <section className="auth-container">

      <div className="auth-box">

        <h2>
          Crear Subasta
        </h2>

        {/* TÍTULO */}

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        {/* PRECIO */}

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        {/* HORAS */}

        <input
          type="number"
          placeholder="Horas"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value)
          }
        />
        <input
  type="number"
  min="0"
  max="59"
  placeholder="Minutos"
  value={minutes}
  onChange={(e) => setMinutes(e.target.value)}
/>
<select

  value={category}

  onChange={(e) =>

    setCategory(
      e.target.value
    )

  }

>

  <option value="">
    Selecciona categoría
  </option>

  <option value="Tecnología">
    Tecnología
  </option>

  <option value="Gaming">
    Gaming
  </option>

  <option value="Ropa">
    Ropa
  </option>

  <option value="Hogar">
    Hogar
  </option>

  <option value="Coleccionables">
    Coleccionables
  </option>

</select>

<input

  type="text"
  placeholder="Estado"
  value={condition}
  onChange={(e) =>
    setCondition(e.target.value)
  }
/>

<textarea
  placeholder="Descripción"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
></textarea>
<label htmlFor="auction-image">
  URL de la imagen
</label>

<input
  type="url"
  placeholder="https://sitio.com/imagen.jpg"
  value={image}
  onChange={(e) => setImage(e.target.value)}
/>

<p className="image-help">
  Pega el enlace directo de una imagen alojada en internet.
</p>

{image && (
  <img
    src={image}
    alt="Vista previa del producto"
    className="auction-image-preview"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
    onLoad={(e) => {
      e.currentTarget.style.display = "block";
    }}
  />
)}

        {/* PREVIEW */}

        {image && (

          <img

            src={image}

            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "15px"
            }}

          />

        )}

        {/* BOTÓN */}

        <button
          onClick={handleSubmit}
        >
          Publicar
        </button>

      </div>

    </section>

  );

};