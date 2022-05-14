import { useContext } from 'react';
import CartContext from '../../lib/graphql/context/Cart/index';

import Link from 'next/link';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';


export default function NavBar() {
          const { items } = useContext(CartContext);

          const itemsCount = Object.values(items).reduce((a, b) => a + b, 0);


          return (
                    <Box position="fixed" top={0} left={0} w="full" bgColor="white" boxShadow="md">
                              <Flex width="container.xl" m="auto" p="5" justifyContent="space-between">
                                        <Link href="/" passHref>
                                                  <Text textColor="blue.800" fontWeight="bold" fontSize="2xl" as="a">
                                                            My e-commerce
                                                  </Text>
                                        </Link>

                                        <Box>
                                                  <Link href="/cart" passHref>
                                                            <Button as="a">
                                                                      <MdShoppingCart />
                                                                      <Text ml="3">{itemsCount}</Text>
                                                            </Button>
                                                  </Link>
                                        </Box>
                              </Flex>
                    </Box>
          );
}