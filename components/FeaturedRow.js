import { View, Text, ScrollView } from 'react-native'
import sanityClient from '../sanity';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
const FeaturedRow = ({ id, title, description }) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id ==$id]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]
        `, { id }).then((data) => setRestaurants(data?.restaurants));
    }, [id])

    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color='#00ccBB' />
            </View>
            <Text className='px-4 text-gray-500 text-xs'>{description}</Text>
            <ScrollView
                className='pt-4'
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}>

                {/* Restaurant Cards */}
                {restaurants?.map(restaurant => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        address={restaurant.address}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
export default FeaturedRow