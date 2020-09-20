import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import Categories from './Categories';
import SlideItem from './SlideItem';
import Progress from './Progress';

const getCategories = items => {
  const uniqueCategories = items.reduce((acc, item) => (acc[item.category] = item, acc), {})
  return Object.keys(uniqueCategories);
};

const Slider = ({ menuItems }) => {
  const availableCategories = getCategories(menuItems);

  const sliderRef = useRef(null);
  const [selectedCategory, setCategory] = useState(availableCategories[0]);
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  const onMomentumScrollEnd = useCallback(e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setVisibleImageIndex(pageNum);
  }, [visibleImageIndex]);

  // const onScroll = e => {
  //   const { contentOffset } = e.nativeEvent;
  //   const viewSize = e.nativeEvent.layoutMeasurement;
  //   const maxWidth = viewSize.width * (menuItems.length - 1);

  //   if (contentOffset.x > maxWidth) {
  //     sliderRef.current.scrollTo({ x: 0, animated: false });
  //   }

  //   if (contentOffset.x < 0) {
  //     sliderRef.current.scrollTo({ x: maxWidth, animated: false });
  //   }
  // };

  useEffect(() => {
    if (selectedCategory !== menuItems[visibleImageIndex].category) {
      setCategory(menuItems[visibleImageIndex].category);
    }
  }, [menuItems, visibleImageIndex, selectedCategory])

  const handleCategoryChange = nextCategory => {
    setCategory(nextCategory);
    const idx = menuItems.findIndex(({ category }) => category === nextCategory);
    if (idx !== -1) {
      sliderRef.current.scrollToIndex({ animated: false, index: idx })
    }
  };

  const { color } = menuItems[visibleImageIndex];

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.categoriesContainer}>
        <Categories
          availableCategories={availableCategories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </View>
      <View style={styles.backgroundContainer} backgroundColor={color} />
      <View style={styles.contentContainer}>
        <FlatList
          data={menuItems}
          renderItem={({ item }) => <SlideItem src={item.src} color={item.color} />}
          keyExtractor={item => item.id}
          ref={sliderRef}
          style={styles.imageSliderContainer}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
      </View>
      <View style={styles.progressContainer}>
        <Progress menuItems={menuItems} selectedCategory={selectedCategory} visibleImageIndex={visibleImageIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 320,
    position: 'relative',
  },
  categoriesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  contentContainer: {
    paddingTop: 20,
  },
  imageSliderContainer: {},
  progressContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    // zIndex: 10,
  },
});

export default Slider;
