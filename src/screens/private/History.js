import React from 'react';
import { FlatList, Text } from 'react-native';
import Container from 'components/Container';
import Header from 'components/Header/Header';
import FoodListItem from 'components/History/FoodListItem';
import { Images } from 'config';
import { scaleW } from 'utils/scale';

const data = [
  {
    id: 1,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 9.5,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food1,
  },
  {
    id: 2,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 7.3,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food2,
  },
  {
    id: 3,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 4.2,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food3,
  },
  {
    id: 4,
    name: 'Quality Street Chocolates & Toffees',
    category: 'Nestle',
    score: 2.1,
    amount: '350',
    calory: '120',
    time: '8 day ago',
    image: Images.Food4,
  },
];
import * as ProductService from 'services/productService';

export default class History extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
     const products = await ProductService.findAllProducts();

     this.setState({
      products: products
     });
     console.log('products', productsAsArray);
  }


  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Header navigation={navigation} title="History" />
        <FlatList
          contentContainerStyle={{ padding: scaleW(10) }}
          style={{ flex: 1 }}
          data={this.state.products}
          keyExtractor={ (item, index) => index.toString()}
          renderItem={({item}) => <FoodListItem 
          key={item.code} 
          data={{
            id: item.code,
            name: item.product_name,
            category: item.brands,
            score: item.score,
            amount: item.serving_size,
            calory: item.nutriments && item.nutriments['energy-kcal_serving'],
            image: item.image_url,
            time: 'momnet age'
          }} />}
        />
      </Container>
    );
  }
}