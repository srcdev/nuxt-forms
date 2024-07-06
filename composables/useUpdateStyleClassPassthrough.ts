export const useUpdateStyleClassPassthrough = (classes: string) => {
  const styleClassPassthroughRef = ref(classes);

  function updateClasses(add: boolean, cssClass: string) {
    let classesArray = classes.split(' ');

    if (add && !classesArray.includes(cssClass)) {
      classesArray.push(cssClass);
    } else if (!add && classesArray.includes(cssClass)) {
      classesArray = classesArray.filter((className) => className !== cssClass);
    }

    // if (classesArray.includes(cssClass)) {
    //   // Remove the value if it's already in the array
    //   classesArray = classesArray.filter(className => className !== cssClass);
    // } else {
    //   // Add the value if it's not in the array
    //   classesArray.push(cssClass);
    // }

    // Join the array back into a string and assign it back
    styleClassPassthroughRef.value = classesArray.join(' ');
  }

  return {
    styleClassPassthroughRef,
    updateClasses,
  };
};
