import img from "../../assets/GOORIN-BROS-PANTHER.webp";

function CarShop() {
  return (
    <section className="flex w-full flex-col items-center gap-3 p-3 font-Poppins">
      <div className="flex w-full max-w-md flex-col gap-3">
        <h2 className="text-2xl font-bold">Tu carrito - 2</h2>
        <div className="flex flex-col items-center gap-3 px-3">
          <div className="flex w-full max-w-96 flex-row items-center justify-center gap-6 rounded-lg border border-black px-3 py-2">
            <img
              src={img}
              alt="Image example"
              className="w-full max-w-32 rounded-lg"
            />
            <div>
              <h3 className="text-base font-bold">GOORIN BROS PANTHER</h3>
              <p>
                <span className="font-semibold">Talla:</span> 7/8
              </p>
              <p>
                <span className="font-semibold">Cantidad:</span> 2
              </p>
              <p>
                <span className="font-semibold">Precio:</span> $ 220.000
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-96 flex-row items-center justify-center gap-6 rounded-lg border border-black px-3 py-2">
            <img
              src={img}
              alt="Image example"
              className="w-full max-w-32 rounded-lg"
            />
            <div>
              <h3 className="text-base font-bold">GOORIN BROS PANTHER</h3>
              <p>
                <span className="font-semibold">Talla:</span> 7/8
              </p>
              <p>
                <span className="font-semibold">Cantidad:</span> 2
              </p>
              <p>
                <span className="font-semibold">Precio:</span> $ 220.000
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-96 flex-col gap-1">
            <h3 className="font-bold">
              <span className="font-semibold">Total:</span> $440.000
            </h3>
            <button className="w-full max-w-96 rounded-md bg-black py-4 text-center text-white">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarShop;
