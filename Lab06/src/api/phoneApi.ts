import { PHONES } from "../data/phones";
import { Phone } from "../types";

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
export const USING_API = API_URL !== "";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm");
    return p;
  }

  const res = await fetch(`${API_URL}/phones`);
  console.log("GỌI:", res.url, res.status, res.headers.get("content-type"));
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);

  const list = (await res.json()) as Phone[];
  const found = list.find((p) => String(p.id) === id) ?? list[0];
  if (!found) throw new Error("API chưa có dữ liệu");
  return found;
}
export async function fetchPhones(): Promise<Phone[]> {
  if (!USING_API) {
    await sleep(600);
    return PHONES; // chế độ offline
  }
  const res = await fetch(`${API_URL}/phones`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone[];
}