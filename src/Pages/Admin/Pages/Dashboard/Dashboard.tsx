import { useState, useMemo } from "react";
import { Product } from "../../../../types";
import { useGlobalContext } from "../../../../context/Global.context";

type SortDirection = "ascending" | "descending";

interface SortConfig {
  key: keyof Product;
  direction: SortDirection;
}

export function Dashboard() {
  const { allProducts } = useGlobalContext();

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });

  const sortedProducts = useMemo(() => {
    if (!allProducts) return [];
    const sortableProducts = [...allProducts];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [sortConfig, allProducts]);

  const sortProducts = (key: keyof Product) => {
    let direction: SortDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Product) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  if (!allProducts) {
    return <div>Cargando productos...</div>;
  }

  return (
    <section className="flex flex-col items-center gap-4 pt-2">
      <h2 className="text-center text-2xl font-semibold">
        Panel Administrativo
      </h2>
      <button className="rounded border border-black px-9 py-2 text-lg">
        Añadir Producto
      </button>
      <div className="container mx-auto max-w-5xl px-4 py-2">
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => sortProducts("name")}
                >
                  Nombre {getSortIndicator("name")}
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => sortProducts("brand")}
                >
                  Marca {getSortIndicator("brand")}
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  onClick={() => sortProducts("price")}
                >
                  Precio {getSortIndicator("price")}
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
