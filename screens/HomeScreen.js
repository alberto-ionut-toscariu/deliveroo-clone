import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import { ChevronDownIcon, UserIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategory, setFeaturedCategory] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }
        `).then(data => {
            setFeaturedCategory(data);
        });
    }, [])

    return (
        <SafeAreaView className='bg-white pt-5'>
            {/*Header*/}
            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image
                    className='h-7 w-7 bg-stone-400 p-4 rounded-full'
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                />

                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>
                        Deliver Now!
                    </Text>
                    <Text className='font-bold text-xl'>
                        Current Location
                        <ChevronDownIcon size={20} color='#00ccBB' />
                    </Text>
                </View>

                <UserIcon size={35} color='#00ccBB' />
            </View>

            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4' >

                <View className='flex-row flex-1 space-x-2 bg-stone-200 p-3'>
                    <MagnifyingGlassIcon color='gray' size={20} />
                    <TextInput
                        placeholder='Restaurant and cuisines'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsVerticalIcon color='#00ccBB' />

            </View>

            {/* Body */}
            <ScrollView className='bg-stone-100 '
                contentContainerStyle={{
                    paddingBottom: 100,
                }}>
                {/* Categories */}
                <Categories />

                {/* Featured */}

                {featuredCategory?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}

            </ScrollView>
        </SafeAreaView >
    );
};
export default HomeScreen