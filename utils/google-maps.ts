import axios from "axios";

interface AddressComponentProps {
  long_name: string;
  short_name: string;
  types: string[];
}

export type Address = {
  adminArea3?: string;
  formattedAddress?: string;
};

export const findAddress = async (
  lat: number,
  lng: number,
): Promise<Address> => {
  try {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const addressComponents = response.data.results[0].address_components;
      const formattedAddress = response.data.results[0].formatted_address;
      const adminArea3 = addressComponents.filter(
        (addressComponent: AddressComponentProps) =>
          addressComponent.types.includes("administrative_area_level_3"),
      )[0].short_name;

      return { formattedAddress, adminArea3 };
    } else {
      throw new Error("fetch-location-failed-error-text");
    }
  } catch (err) {
    throw err;
  }
};
