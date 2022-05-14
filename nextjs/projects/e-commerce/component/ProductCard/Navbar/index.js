import Link from 'next/link';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';


export default function NavBar() {


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
                                                            </Button>
                                                  </Link>
                                        </Box>
                              </Flex>
                    </Box>
          );
}