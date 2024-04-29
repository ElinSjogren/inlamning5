export function navbarNavigation() {
    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Show Events', href: '../../pagelayout/data', current: false },
        { name: 'Add Event', href: '../../components/addeventdb', current: false }
    ];
    
    return { navigation};
}
