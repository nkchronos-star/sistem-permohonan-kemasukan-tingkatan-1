const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdminPanel.tsx', 'utf8');

const brokenPartStart = `       {activeTab === 'KAWALAN' && (
         <div className="space-y-16">  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    updateSettings({
      [name]: type === 'checkbox' ? checked : value
    });
  };`;

const fix = `       {activeTab === 'KAWALAN' && (
         <div className="space-y-16">`;

const brokenPartStartAlt = `       {activeTab === 'KAWALAN' && (
         <div className="space-y-16">  const handleSettingsChange =`;

// The actual text might be slightly different. Let's use regex or split.
const parts = code.split(`       {activeTab === 'KAWALAN' && (
         <div className="space-y-16">`);

if (parts.length === 2) {
  const rest = parts[1];
  // I need to remove the duplicate function definitions from `rest` up to `return (`
  const returnIndex = rest.indexOf(`  return (
    <div className="space-y-16">`);
  
  if (returnIndex !== -1) {
    const newRest = rest.substring(returnIndex + `  return (
    <div className="space-y-16">`.length);
    code = parts[0] + `       {activeTab === 'KAWALAN' && (
         <div className="space-y-16">` + newRest;
    fs.writeFileSync('src/components/dashboard/AdminPanel.tsx', code);
    console.log("Fixed!");
  } else {
    console.log("Return not found");
  }
} else {
  console.log("Parts not found");
}

