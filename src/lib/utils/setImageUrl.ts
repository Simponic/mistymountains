import { supabase } from '../supabase';

export const setImageUrl = (imageSpec) => {
  const { publicURL, error } = supabase
    .storage
    .from('mistymountains')
    .getPublicUrl(imageSpec.image);
  if (!error) {
    return { ...imageSpec, image: publicURL };
  }
  return imageSpec;
}
