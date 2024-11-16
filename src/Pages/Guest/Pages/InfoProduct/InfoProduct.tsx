import img from "../../../../assets/GOORIN-BROS-PANTHER.webp";

export function InfoProduct() {
  return (
    <section className="flex flex-col items-center py-5 font-Poppins">
      <div className="w-full max-w-xl lg:max-w-full">
        <div className="flex flex-col justify-center gap-4 px-6 lg:flex-row lg:gap-5 xl:gap-14">
          <img
            src={img}
            alt="Image example"
            className="w-auto px-3 lg:w-full lg:max-w-xl lg:p-0"
          />
          <div className="flex flex-col gap-2 lg:w-full lg:max-w-96">
            <h3 className="text-2xl font-bold">GOORIN BROS PANTHER</h3>
            <div>
              <h4 className="text-xl font-semibold">$ 220.000,00 COP</h4>
              <span className="text-slate-700">Impuesto incluido</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold">Tallas</h4>
              <ul className="flex flex-row flex-wrap gap-2">
                <li className="w-full max-w-[72px] rounded-lg bg-black py-2 text-center text-white">
                  6 7/8
                </li>
                <li className="w-full max-w-[72px] rounded-lg border border-black py-2 text-center">
                  7
                </li>
                <li className="w-full max-w-[72px] rounded-lg border border-black py-2 text-center">
                  7 1/8
                </li>
                <li className="w-full max-w-[72px] rounded-lg border border-black py-2 text-center">
                  7 1/4
                </li>
                <li className="w-full max-w-[72px] rounded-lg border border-black py-2 text-center">
                  7 3/8
                </li>
                <li className="w-full max-w-[72px] rounded-lg border border-black py-2 text-center">
                  7 1/2
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Cantidad</h4>
              <div className="flex w-full max-w-24 justify-between rounded-md border border-black px-3 py-2">
                <button>-</button>
                <select
                  name="cantidadProducto"
                  id="cantidadProducto"
                  className="bg-transparent"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button>+</button>
              </div>
            </div>
            <h4 className="medium">Unidades disponibles: 4</h4>
            <div className="flex flex-col gap-4">
              <button className="w-full rounded-md bg-black py-5 text-xl font-medium text-white">
                Comprar Ahora
              </button>
              <button className="w-full rounded-md border-2 border-black py-4 text-xl font-medium">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
