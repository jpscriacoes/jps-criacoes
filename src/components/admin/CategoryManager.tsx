import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, useUploadCategoryImage } from '@/hooks/useCategories';
import { toast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type IconType = 'emoji' | 'upload';

const CategoryManager = () => {
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });
  const [iconType, setIconType] = useState<IconType>('emoji');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', icon: '' });
  const [editIconType, setEditIconType] = useState<IconType>('emoji');
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const newFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const uploadImage = useUploadCategoryImage();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name.trim()) {
      toast({ title: "Erro de validação", description: "O nome é obrigatório.", variant: "destructive" });
      return;
    }

    let iconValue = newCategory.icon.trim();

    try {
      if (iconType === 'upload' && newImageFile) {
        toast({ title: "Enviando imagem...", description: "Aguarde enquanto o ícone é enviado." });
        iconValue = await uploadImage.mutateAsync({ file: newImageFile });
      }

      if (!iconValue) {
        toast({ title: "Erro de validação", description: "O ícone (emoji ou imagem) é obrigatório.", variant: "destructive" });
        return;
      }

      await createCategory.mutateAsync({ name: newCategory.name, icon: iconValue });
      
      setNewCategory({ name: '', icon: '' });
      setNewImageFile(null);
      if (newFileInputRef.current) newFileInputRef.current.value = "";
      setIconType('emoji');

      toast({ title: "Categoria criada!", description: "A categoria foi adicionada com sucesso." });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      toast({ title: "Erro ao criar", description: `${error instanceof Error ? error.message : 'Tente novamente.'}`, variant: "destructive" });
    }
  };

  const startEdit = (category: any) => {
    setEditingId(category.id);
    setEditData({ name: category.name || '', icon: category.icon || '' });
    const isUrl = category.icon?.startsWith('http');
    setEditIconType(isUrl ? 'upload' : 'emoji');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ name: '', icon: '' });
  };

  const handleUpdate = async (id: string) => {
    if (!editData.name.trim()) {
      toast({ title: "Erro de validação", description: "O nome é obrigatório.", variant: "destructive" });
      return;
    }

    let iconValue = editData.icon;

    try {
      if (editIconType === 'upload' && editImageFile) {
        toast({ title: "Enviando nova imagem...", description: "Aguarde enquanto o novo ícone é enviado." });
        iconValue = await uploadImage.mutateAsync({ file: editImageFile, categoryId: id });
      }

      if (!iconValue) {
        toast({ title: "Erro de validação", description: "O ícone é obrigatório.", variant: "destructive" });
        return;
      }
      
      await updateCategory.mutateAsync({ id, name: editData.name.trim(), icon: iconValue });

      setEditingId(null);
      setEditData({ name: '', icon: '' });
      setEditImageFile(null);
      if (editFileInputRef.current) editFileInputRef.current.value = "";

      toast({ title: "Categoria atualizada!", description: "A categoria foi atualizada com sucesso." });
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      toast({ title: "Erro ao atualizar", description: `${error instanceof Error ? error.message : 'Tente novamente.'}`, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria? Todos os produtos desta categoria também serão excluídos.')) {
      try {
        await deleteCategory.mutateAsync(id);
        toast({
          title: "Categoria excluída!",
          description: "A categoria foi excluída com sucesso.",
        });
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        toast({
          title: "Erro ao excluir categoria",
          description: "Ocorreu um erro ao excluir a categoria.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando categorias...</div>;
  }

  const renderCategoryIcon = (icon: string) => {
    const isUrl = icon.startsWith('http');
    return isUrl ? <img src={icon} alt="ícone" className="w-8 h-8 rounded-full object-cover" /> : <span className="text-2xl">{icon}</span>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Aniversário Infantil"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo do Ícone</Label>
              <RadioGroup value={iconType} onValueChange={(v) => setIconType(v as IconType)} className="flex gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="emoji" id="r1" /><Label htmlFor="r1">Emoji</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="upload" id="r2" /><Label htmlFor="r2">Upload</Label></div>
              </RadioGroup>
            </div>

            {iconType === 'emoji' ? (
              <div className="space-y-2">
                <Label htmlFor="icon">Ícone (Emoji)</Label>
                <Input
                  id="icon"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🎂"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="icon-file">Imagem do Ícone</Label>
                <Input
                  id="icon-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImageFile(e.target.files ? e.target.files[0] : null)}
                  ref={newFileInputRef}
                />
              </div>
            )}

            <Button 
              type="submit" 
              disabled={createCategory.isPending || uploadImage.isPending}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              {createCategory.isPending || uploadImage.isPending ? 'Criando...' : 'Criar Categoria'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorias Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg gap-4">
                  {editingId === category.id ? (
                    <>
                      <div className="flex-1 space-y-3">
                        <Input
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <RadioGroup
                          value={editIconType}
                          onValueChange={(v) => setEditIconType(v as IconType)}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="emoji" id={`edit-r1-${category.id}`} />
                            <Label htmlFor={`edit-r1-${category.id}`}>Emoji</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upload" id={`edit-r2-${category.id}`} />
                            <Label htmlFor={`edit-r2-${category.id}`}>Upload</Label>
                          </div>
                        </RadioGroup>
                        {editIconType === 'emoji' ? (
                          <Input
                            value={editData.icon}
                            onChange={(e) => setEditData(prev => ({ ...prev, icon: e.target.value }))}
                          />
                        ) : (
                          <div>
                            <Label className="text-xs">Substituir imagem:</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setEditImageFile(e.target.files ? e.target.files[0] : null)}
                              ref={editFileInputRef}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(category.id)}
                          disabled={updateCategory.isPending || uploadImage.isPending}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={updateCategory.isPending || uploadImage.isPending}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        {renderCategoryIcon(category.icon)}
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="outline">ID: {category.id}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(category.id)}
                          disabled={deleteCategory.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma categoria cadastrada ainda.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManager;
